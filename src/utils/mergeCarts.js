import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { setCartItems } from '../features/cart/cartSlice'

export const mergeCarts = async (userId, localCartItems, dispatch) => {
  const userCartRef = doc(db, 'carts', userId)
  const userCartDoc = await getDoc(userCartRef)

  let finalCartItems = {}

  if (userCartDoc.exists()) {
    const firestoreCartItems = userCartDoc.data().items || []
    const structuredFirestoreCart = firestoreCartItems
    const structuredLocalCart = localCartItems

    Object.keys(structuredLocalCart).forEach((id) => {
      if (structuredFirestoreCart[id]) {
        structuredFirestoreCart[id].quantity += structuredLocalCart[id].quantity
      } else {
        structuredFirestoreCart[id] = structuredLocalCart[id]
      }
    })

    finalCartItems = structuredFirestoreCart
  } else {
    finalCartItems = localCartItems
  }

  await setDoc(userCartRef, { items: finalCartItems })

  dispatch(setCartItems(finalCartItems))
}
