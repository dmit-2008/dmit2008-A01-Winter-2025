import { useRouter } from "next/router"

export default function User() {
  // you need to initialize the router
  const router = useRouter()

  const { id } = router.query

  console.log(router)

  return <h1>User: { id }</h1>
}