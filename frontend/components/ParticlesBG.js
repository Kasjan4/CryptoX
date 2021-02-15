import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Particles from 'react-particles-js'


const ParticlesBG = () => {

  return <Particles
    params={{
      'particles': {
        'number': {
          'value': 60,
          'density': {
            'enable': true,
            'value_area': 1500
          }
        },
        'line_linked': {
          'enable': true,
          'opacity': 0.02
        },
        'move': {
          'direction': 'right',
          'speed': 0.7
        },
        'size': {
          'value': 3
        },
        'opacity': {
          'anim': {
            'enable': true,
            'speed': 1,
            'opacity_min': 0.05
          }
        }
      },
      'interactivity': {
        'events': {
          'onclick': {
            'enable': true,
            'mode': 'push'
          }
        },
        'modes': {
          'push': {
            'particles_nb': 1
          }
        }
      },
      'retina_detect': true
    }}
    style={{
      position: 'fixed',
      width: '100vw',
      height: '100vh'

    }}
  />










}


export default withRouter(ParticlesBG)