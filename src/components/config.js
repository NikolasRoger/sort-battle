import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfig } from "../context/general";
import { useState } from "react";

export default () => {

  const { roullete } = useConfig()

  const [itemInput, setItemInput] = useState("")

  const _handleNewItem = () => {
    if(itemInput != "") {
      roullete.add(itemInput)
      setItemInput("")
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography my={5} variant="h4">Configuração</Typography>
      <Box
        width={700}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="roullete-config"
            id="roullete-header"
          >
            <Typography>Roleta</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <TextField label="Opção da roleta" value={itemInput} onChange={(e) => setItemInput(e.target.value)}/>
              <Button variant="contained" size="large" onClick={_handleNewItem}>Adicionar</Button>
            </Box>
            <List dense={true}>
              {
                roullete.get.map((item, i) => (
                  <ListItem
                    key={item+i}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => roullete.remove(i)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={item}
                    />
                  </ListItem>
                ))
              }
              </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  )
}