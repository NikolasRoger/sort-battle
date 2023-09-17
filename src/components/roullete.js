import { Box, Button, Modal, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import { Wheel } from 'react-custom-roulette'
import { useConfig } from "../context/general";

export default ({ open, handleCloseModal }) => {

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const { roullete } = useConfig()
  const [ended, setEnded] = useState(false)
  
  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  const data = roullete.get.map((i) => ({ option: i }))

  const closeModal = () => {
    if(ended) {
      handleCloseModal(data[prizeNumber].option)
    } else {
      handleCloseModal(null)
    }
    setEnded(false)
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Box 
          bgcolor="white"
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" mb={2}>Escolha do jogo</Typography>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}

            onStopSpinning={() => {
              setMustSpin(false);
              setEnded(true);
            }}
          />
          {
            ended && (
              <Typography mb={2}>{data[prizeNumber].option}</Typography>
            )
          }
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
          <Button variant="contained" color="error" onClick={closeModal}>Fechar</Button>
          <Button variant="contained" onClick={handleSpinClick}>Spin</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}