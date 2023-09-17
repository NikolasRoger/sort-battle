import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export default ({ onCreateBattle, onClose, open, editMatch }) => {

  const [firstPlayer, setFirstPlayer] = useState("")
  const [secondPlayer, setSecondPlayer] = useState("")

  const handleCreateBattle = () => {
    if(firstPlayer != "" && secondPlayer != "") {
      onCreateBattle(firstPlayer, secondPlayer)
      setFirstPlayer("")
      setSecondPlayer("")
    }
  }

  useEffect(() => {
    if(editMatch) {
      setFirstPlayer(editMatch.players[0].name)
      setSecondPlayer(editMatch.players[1].name)
    } else {
      setFirstPlayer("")
      setSecondPlayer("")
    }
  }, [editMatch])

  return (
    <Modal
      open={open}
      onClose={onClose}
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
          gap={2}
        >
          <Typography variant="h5" mb={2}>Batalha</Typography>
          <TextField label="Jogador 1" value={firstPlayer} onChange={(e) => setFirstPlayer(e.target.value)}/>
          <TextField label="Jogador 2" value={secondPlayer} onChange={(e) => setSecondPlayer(e.target.value)}/>
          <Box
            display="flex"
            flexDirection="row"
            gap={2}
            mt={2}
          >
            <Button color="error" onClick={onClose}>Fechar</Button>
            <Button variant="contained" onClick={handleCreateBattle}>Salvar</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}