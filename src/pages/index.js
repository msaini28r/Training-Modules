import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import "./styles.css" // Import the stylesheet

export default function Home({ data }) {
  const allTrainingModules = data.allTrainingModulesYaml.nodes

  const [statusFilter, setStatusFilter] = useState(null)
  const [videosFilter, setVideosFilter] = useState(false)

  // Filter the training modules based on the selected filters
  const trainingModules = allTrainingModules.filter((node) => {
    if (statusFilter && node.status !== statusFilter) {
      return false
    }
    if (videosFilter && !node.videos) {
      return false
    }
    return true
  })

  // Get the list of all available statuses to populate the dropdown
  const statuses = Array.from(new Set(allTrainingModules.map((node) => node.status)))

  return (
    <>
      <Helmet>
        <title>Training Modules</title>
      </Helmet>
      <div className="container">
        <div className="filters-container">
          <div className="filters">
            <h2>Filter by:</h2>
            <label>
              Status:
              <select
                value={statusFilter || ""}
                onChange={(e) => setStatusFilter(e.target.value || null)}
              >
                <option value="">All</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Videos:
              <input
                type="checkbox"
                checked={videosFilter}
                onChange={(e) => setVideosFilter(e.target.checked)}
              />
            </label>
          </div>
        </div>
        <div className="cards-container">
          {trainingModules.map((node) => (
            <div key={node.id} className="card">
              <div>
                <img src={node.heroImage} alt={node.name} className="heroImage" style={{ width: 200, height: 200 }} />
              </div>
              <div className="content">
              <h2>{node.name}</h2>
              <p>{node.description}</p>
              <div className="links-container">
                <a href={node.repository}>Repository</a>
                <a href={node.webpage}>Rendered Webpage</a>
                <a href={node.videos}>Video Playlist</a>
              </div>
              </div>
              <span className={`status ${node.status.toLowerCase()}`}>{node.status}</span>
              
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query {
    allTrainingModulesYaml {
      nodes {
        id
        name
        description
        repository
        webpage
        videos
        status
        heroImage
      }
    }
  }
`
