import {
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import { db } from '@/config/firebase';
import { Donation, Nercha } from './definitions';

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
  console.log(id);

  const nerchaListRef = doc(db, 'nercha_list', id);
  const nerchaDocSnap = await getDoc(nerchaListRef);
  if (nerchaDocSnap.exists()) {
    nerchaDocSnap.data();
  }
  return undefined;
}

export async function fetchNerchaDonationsById(
  id: string,
): Promise<Donation[] | undefined> {
  const nerchaListRef = doc(db, 'nercha_list', id);

  let donArr = [];
  const nerchaCollectionRef = collection(db, 'nercha_donations');
  const dateQuery = query(
    nerchaCollectionRef,
    where('nercha_name', '==', nerchaListRef),
    orderBy('donated_at', 'desc'),
    limit(3),
  );
  const nerchaQuerySnapShot = await getDocs(dateQuery);

  donArr = nerchaQuerySnapShot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    care_of: doc.data().care_of,
    amount: doc.data().amount,
    donated_at: doc.data().donated_at,
    status: doc.data().status,
  }));
  return donArr;
}
