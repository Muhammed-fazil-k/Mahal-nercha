import {
  DocumentSnapshot,
  collection,
  doc,
  getAggregateFromServer,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  sum,
  where,
} from 'firebase/firestore';

import { db } from '@/config/firebase';
import { Donation, Nercha, Timestamp } from './definitions';
import { start } from 'repl';
import cluster from 'cluster';

export async function fetchNercha(): Promise<Nercha[]> {
  let nerchaArr = [];
  const nerchaCollection = collection(db, 'nercha_list');
  const dateQuery = query(nerchaCollection, orderBy('created_at', 'desc'));
  const nerchaQuerySnapShot = await getDocs(dateQuery);

  nerchaArr = nerchaQuerySnapShot.docs.map((doc) => ({
    id: doc.id,
    active: doc.data().active, // Access specific properties
    created_at: doc.data().created_at,
    nercha_date: doc.data().nercha_date,
    nercha_name: doc.data().nercha_name,
  }));
  return nerchaArr;
}

export async function fetchNerchaById(id: string): Promise<Nercha | undefined> {
  const nerchaListRef = doc(db, 'nercha_list', id);
  const nerchaDocSnap = await getDoc(nerchaListRef);

  if (nerchaDocSnap.exists()) {
    return {
      id: nerchaDocSnap.id,
      active: nerchaDocSnap.data().active, // Access specific properties
      created_at: nerchaDocSnap.data().created_at,
      nercha_date: nerchaDocSnap.data().nercha_date,
      nercha_name: nerchaDocSnap.data().nercha_name,
    };
  }
  return undefined;
}

export async function fetchDonationById(
  id: string,
): Promise<Donation | undefined> {
  const donationRef = doc(db, 'nercha_donations', id);
  const donationDocSnap = await getDoc(donationRef);

  if (donationDocSnap.exists()) {
    return {
      id: donationDocSnap.id,
      name: donationDocSnap.data().name, // Access specific properties
      care_of: donationDocSnap.data().care_of,
      amount: donationDocSnap.data().amount,
      donated_at: donationDocSnap.data().donated_at,
      status: donationDocSnap.data().status,
      cluster_id: donationDocSnap.data().cluster_id,
    };
  }
  return undefined;
}

const ITEMS_PER_PAGE = 3;
export async function fetchFirstNerchaDonations(
  id: string,
): Promise<{ donations: Donation[]; lastDonationDate: Timestamp }> {
  const nerchaListRef = doc(db, 'nercha_list', id);

  let donations = [];
  const nerchaCollectionRef = collection(db, 'nercha_donations');
  const dateQuery = query(
    nerchaCollectionRef,
    where('nercha_name', '==', nerchaListRef),
    orderBy('donated_at', 'desc'),
    limit(ITEMS_PER_PAGE),
  );
  const nerchaQuerySnapShot = await getDocs(dateQuery);

  let lastDonationDate: Timestamp = { seconds: 0, nanoseconds: 0 };
  donations = nerchaQuerySnapShot.docs.map((doc) => {
    lastDonationDate = doc.data().donated_at;
    return {
      id: doc.id,
      name: doc.data().name,
      care_of: doc.data().care_of,
      amount: doc.data().amount,
      donated_at: doc.data().donated_at,
      status: doc.data().status,
      cluster_id: doc.data().cluster_id,
    };
  });
  return { donations, lastDonationDate };
}
export async function fetchMoreNerchaDonations(
  id: string,
  key: Timestamp,
): Promise<{ donations: Donation[]; lastDonationDate: Timestamp }> {
  const nerchaListRef = doc(db, 'nercha_list', id);

  let donations = [];
  const nerchaCollectionRef = collection(db, 'nercha_donations');
  const dateQuery = query(
    nerchaCollectionRef,
    where('nercha_name', '==', nerchaListRef),
    orderBy('donated_at', 'desc'),
    startAfter(key),
    limit(ITEMS_PER_PAGE),
  );
  const nerchaQuerySnapShot = await getDocs(dateQuery);

  let lastDonationDate: Timestamp = { seconds: 0, nanoseconds: 0 };
  donations = nerchaQuerySnapShot.docs.map((doc) => {
    lastDonationDate = doc.data().donated_at;
    return {
      id: doc.id,
      name: doc.data().name,
      care_of: doc.data().care_of,
      amount: doc.data().amount,
      donated_at: doc.data().donated_at,
      status: doc.data().status,
      cluster_id: doc.data().cluster_id,
    };
  });
  return { donations, lastDonationDate };
}

//Statitics
export async function fetchDonationCountPerNercha(id: string) {
  const nerchaListRef = doc(db, 'nercha_list', id);

  const coll = collection(db, 'nercha_donations');
  const q = query(coll, where('nercha_name', '==', nerchaListRef));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
}

export async function fetchTotalDonationAmountPerNercha(id: string) {
  const nerchaListRef = doc(db, 'nercha_list', id);

  const coll = collection(db, 'nercha_donations');
  const q = query(coll, where('nercha_name', '==', nerchaListRef));
  const snapshot = await getAggregateFromServer(q, {
    totalAmount: sum('amount'),
  });
  return snapshot.data().totalAmount;
}
