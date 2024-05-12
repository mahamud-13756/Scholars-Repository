import React from 'react'

const Videos = () => {
  return (
    <div>
`      <video width="320" height="240" controls autoPlay>
        <source src="https://www.youtube.com/watch?v=mz0tEef4f3A" type="video/mp4" />
      </video>
      <video width="320" height="240" controls>
        <source src="https://www.youtube.com/watch?v=mz0tEef4f3A" type="video/mp4" />
      </video>`
    </div>
  )
}

export default Videos
