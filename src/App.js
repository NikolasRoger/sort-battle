import React, { useState } from 'react'
import Config from './components/config'
import { GeneralContextProvider } from './context/general'
import Bracket from './components/bracket'
import { Box } from '@mui/material'

export default () => {
  return (
    <GeneralContextProvider>
      <Pages/>
    </GeneralContextProvider>
  )
}

const Pages = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Config/>
      <Bracket/>
    </Box>
  )
}