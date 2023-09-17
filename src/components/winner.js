import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export default ({onClose, onSelectWinner, open, match }) => {
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onSelectWinner(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Selecione o vencedor</DialogTitle>
      <List sx={{ pt: 0 }}>
        {match?.players.map((player, pi) => (
          <ListItem disableGutters key={player.name}>
            <ListItemButton onClick={() => handleListItemClick(pi)}>
              <ListItemText primary={player.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}