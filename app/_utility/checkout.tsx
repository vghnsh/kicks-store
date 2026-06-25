type CheckoutParams = {
  lineItems: any[]
  userId: string
  userName: string
  shippingAddress: string
  userEmail: string
  cart: Array<any>
}

const checkout = async ({
  userId,
  userName,
  shippingAddress,
  userEmail,
  cart,
}: CheckoutParams) => {
  const items = cart.map((c) => ({
    title: c.item.title,
    image: c.item.image,
    price: c.item.price * 10,
    quantity: c.quantity,
  }))

  const amount = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  // Persist order details so the success page can save to Firestore after Stripe redirect
  sessionStorage.setItem(
    'pending_order',
    JSON.stringify({ items, amount, address: shippingAddress, userName, userEmail, userId }),
  )

  const lineItems = cart.map((c) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: c.item.title,
        images: [c.item.image],
      },
      unit_amount: Math.round(c.item.price * 100), // cents
    },
    quantity: c.quantity,
  }))

  const res = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lineItems, customerEmail: userEmail }),
  })

  if (!res.ok) {
    sessionStorage.removeItem('pending_order')
    alert('Could not initiate payment. Please try again.')
    return
  }

  const { url } = await res.json()
  window.location.href = url
}

export default checkout
export { checkout }
