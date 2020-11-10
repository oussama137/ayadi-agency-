import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Artist,
} from "./pageStyles/pageStyles"
import { COLORS } from "../constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homeMeta: {
          homePageDescription,
          homePageFeaturedArtists,
          homePageHeaderDescription,
          homePageHeaderPicture,
          homePageHeaderTitle,
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "home", idType: URI) {
          homeMeta {
            homePageDescription
            homePageHeaderDescription
            homePageHeaderTitle
            homePageHeaderPicture {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            homePageFeaturedArtists {
              ... on WPGraphql_Artist {
                slug
                artist {
                  artistName
                  firstName
                  lastName
                  profile {
                    altText
                    sourceUrl
                    imageFile {
                      childImageSharp {
                        fluid(quality: 100, grayscale: true) {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  console.log(homePageFeaturedArtists)
  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image
            fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={homePageHeaderPicture.altText}
          />
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
            <p className="header-description">{homePageHeaderDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="artists">
          <h2>Featured Artists</h2>
          <div className="artist-items">
            {homePageFeaturedArtists.map(({ artist, slug }) => (
              <Artist to={`/${slug}`}>
                <Image
                  fluid={artist.profile.imageFile.childImageSharp.fluid}
                  altText={artist.profile.altText}
                />
                <div className="artist-info">
                  <p>
                    {artist.firstName} {artist.lastName}
                  </p>
                  <p>{artist.artistName}</p>
                </div>
              </Artist>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage