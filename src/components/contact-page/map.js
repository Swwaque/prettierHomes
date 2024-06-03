import React from 'react'
import { config } from '../../helpers/config'
 
const Map = () => {
  return (
    <iframe src={config.contact.center.mapEmbedURL}
      title='map'
      width="100%"
      height="100%"
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    >
    </iframe>
  )
}

export default Map