import {
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

export async function fetchNercha() {
  let nerchaArr = [];
  const nerchaCollection = collection(db, 'nercha_list');
  const dateQuery = query(nerchaCollection, orderBy('created_at', 'desc'));
  const nerchaQuerySnapShot = await getDocs(dateQuery);

  nerchaArr = nerchaQuerySnapShot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return nerchaArr;
}

export async function fetchNerchaById(id: string) {
  console.log(id);

  const nerchaListRef = doc(db, 'nercha_list', id);
  const nerchaDocSnap = await getDoc(nerchaListRef);
  return nerchaDocSnap.data();
}

export async function fetchNerchaDonationsById(id: string) {
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
    ...doc.data(),
    id: doc.id,
  }));
  return donArr;
}
