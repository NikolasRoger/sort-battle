import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { useConfig } from '../context/general';
import { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import RoulleteIcon from '@mui/icons-material/Casino';
import EditIcon from '@mui/icons-material/Edit';
import Roullete from './roullete';
import Winner from './winner';
import Battle from './battle';

export default () => {

  const [matches, setMatches] = useState([])

  const [matchIndex, setMatchIndex] = useState(null)
  const [playerIndex, setPlayerIndex] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const [winnerOpen, setWinnerOpen] = useState(false)
  const [battleOpen, setBattleOpen] = useState(false)
  const [editMatchIndex, setEditMatchIndex] = useState(null)

  useEffect(() => {
    let localMatches = localStorage.getItem("matches")

    if(localMatches) {
      setMatches(JSON.parse(localMatches))
    }
  }, [])

  const handleOpenModal = (matchId, playerId) => {
    setMatchIndex(matchId)
    setPlayerIndex(playerId)
    setModalOpen(true)
  }

  const handleChooseGame = (game) => {
    if(game) {
      setMatches((matches) => {
        matches[matchIndex].players[playerIndex].game = game
  
        return matches
      })
    }

    saveMatchesLocal()

    setModalOpen(false)
  }

  const handleChooseWinner = (winnerIndex) => {
    setMatches((matches) => {
      matches[matchIndex].players[winnerIndex].isWinner = true

      let existMatch = matches.findIndex((m) => m.players.length <= 1)

      if(existMatch >= 0) {
        matches[existMatch].players.push({
          ...matches[matchIndex].players[winnerIndex],
          isWinner: false,
          game: null
        })
      } else {

        let isNotFinal = matches.findIndex((m) => {
          let existWinner = false
          m.players.forEach((p) => {
            if(p.isWinner) existWinner = true
          })

          return !existWinner
        })

        if(isNotFinal >= 0) {
          let newMatch = {
            id: `${new Date().getTime()}`,
            players: [{
              ...matches[matchIndex].players[winnerIndex],
              isWinner: false,
              game: null
            }]
          }
    
          matches.push(newMatch)
        }
      }

      return matches
    })
    saveMatchesLocal()
    setWinnerOpen(false)
  }

  const handleCreateBattle = (firstPlayer, secondPlayer) => {
    if(editMatchIndex) {
      setMatches((matches) => {
        matches[editMatchIndex].players[0].name = firstPlayer
        matches[editMatchIndex].players[1].name = secondPlayer

        return matches
      })
      setEditMatchIndex(null)
    } else {
      let newMatch = {
        id: `${new Date().getTime()}`,
        players: [
          {
            id: '0',
            isWinner: false,
            game: null,
            name: firstPlayer
          },
          {
            id: '1',
            isWinner: false,
            game: null,
            name: secondPlayer
          }
        ]
      }
  
      setMatches((matches) => {
        matches.push(newMatch)
  
        return matches
      })
    }

    saveMatchesLocal()
    setBattleOpen(false)
  }

  const handleOpenWinner = (matchIndex) => {
    setMatchIndex(matchIndex)
    setWinnerOpen(true)
  }

  const handleEditMatch = (matchIndex) => {
    setEditMatchIndex(matchIndex)
    setBattleOpen(true)
  }

  const saveMatchesLocal = () => {
    localStorage.setItem("matches", JSON.stringify(matches))
  }

  const handleFinishBattle = () => {
    localStorage.removeItem("matches")
    setMatches([])
  }

  return (
    <>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      width={900}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        gap={2}
        justifyContent="center"
      >
        <Typography variant='h4' mt={5}>Batalhas</Typography>
        <Button variant='contained' onClick={() => setBattleOpen(true)}>Criar batalha</Button>
        {
          matches.length > 0 && (
            <Button variant='text' onClick={handleFinishBattle} color="error">Finalizar Batalhas</Button>
          )
        }
      </Box>
      {
        matches.length <= 0 && (
          <Typography mt={2}>Nenhuma batalha criada...</Typography>
        )
      }
      <Box
        display="flex"
        flexDirection="row-reverse"
        justifyContent="center"
        gap={2}
        width="100%"
        mt={2}
        flexWrap="wrap-reverse"
      >
        {
          matches.map((match, mi) => (
            <Card sx={{minWidth: 275}} key={`${match.id + mi + new Date().getTime()}`}>
              <CardContent>
                <Typography>Batalha {mi}</Typography>
                <List>
                  {
                    match.players.map((player, pi) => (
                      <ListItem
                        key={`${player.name + player.id + new Date().getTime()}`}
                        secondaryAction={
                          <IconButton edge="end" aria-label="roullete" onClick={() => handleOpenModal(mi, pi)}>
                            <RoulleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={`${player.name} ${player.isWinner ? "- Vencedor" : ""}`}
                          secondary={player.game || "Jogo não selecionado"}
                        />
                      </ListItem>
                    ))
                  }
                </List>
              </CardContent>
              {
                ((match.players.findIndex((p) => p.isWinner === true) === -1) && match.players.length >= 2) && (
                  <CardActions>
                    <Button size="small" onClick={() => handleOpenWinner(mi)}>Definir vencedor</Button>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditMatch(mi)}>
                            <EditIcon />
                    </IconButton>
                  </CardActions>
                )
              }
            </Card>   
          ))
        }
      </Box>
      </Box>
      <Roullete
        open={modalOpen}
        handleCloseModal={handleChooseGame}
      />
      <Winner
        open={winnerOpen}
        match={matches[matchIndex] || null}
        onClose={() => setWinnerOpen(false)}
        onSelectWinner={handleChooseWinner}
      />
      <Battle
        open={battleOpen}
        onClose={() => {
          setBattleOpen(false)
          setEditMatchIndex(null)
        }}
        onCreateBattle={handleCreateBattle}
        editMatch={matches[editMatchIndex] ?? null}
      />
    </>
  )
}