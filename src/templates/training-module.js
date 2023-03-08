import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

export default function TrainingModule({ data }) {
  const { name, description, repository, webpage, videos, heroImage, status } = data.trainingModulesYaml

  return (
    <>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <img src={heroImage} alt={name} />
      <h1>{name}</h1>
      <p>{description}</p>
      <p>
        Repository: <a href={repository}>{repository}</a>
      </p>
      <p>
        Webpage: <a href={webpage}>{webpage}</a>
      </p>
      {videos && (
        <p>
          Video Playlist: <a href={videos}>{videos}</a>
        </p>
      )}
      <p>Status: <span className={`status ${status}`}>{status}</span></p>
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    trainingModulesYaml(id: { eq: $id }) {
      name
      description
      repository
      webpage
      videos
      heroImage
      status
    }
  }
`
