
import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header/Header"
import Hamburger from "./Header/Hamburger"
import OverlayMenu from "./Header/OverlayMenu"
import "./layout.css"

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleOverlayMenu = () => setMenuOpen(!menuOpen)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Hamburger handleOverlayMenu={handleOverlayMenu} />
      <OverlayMenu handleOverlayMenu={handleOverlayMenu} menuOpen={menuOpen} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: "auto",
          padding: 0,
          paddingBottom: "2rem",
        }}
      >
        <main>{children}</main>
        {}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout