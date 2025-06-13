import { useState } from "react"

import { social } from "../data/social"

function LinkTreeView() {

  const [devTreeLinks, setDevTreeLinks] = useState(social)
  
  return (
    <div>LinkTreeView</div>
  )
}

export default LinkTreeView