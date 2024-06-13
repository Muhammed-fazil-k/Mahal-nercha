import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';

import { db } from '@/config/firebase';

export async function fetchNerchaDonations() {
  let donArr = [];
  const nerchaCollection = collection(db, 'nercha_donations');
  const dateQuery = query(
    nerchaCollection,
    orderBy('donatedAt', 'desc'),
    limit(3),
  );
  const nerchaQuerySnapShot = await getDocs(dateQuery);

  donArr = nerchaQuerySnapShot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return donArr;
}
