import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';


 
   
const CustomSwitch = styled(Switch)(({ theme }) => ({
    
    margin: 'auto',

  '& .MuiSwitch-thumb': {
    color: '#e94560', // Thumb color when unchecked

  },

  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: '#fafafa', // Track color when unchecked
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 250,
    }),
  },

  '& .MuiSwitch-switchBase.Mui-checked': {
    transform: 'translateX(16px)',
    color: '#BA374D', // Thumb color when checked

    '& + .MuiSwitch-track': {
      backgroundColor: '#BA374D', // Track color when checked
      opacity: 1,
      border: 'none',
    },
  },

  '& .MuiSwitch-switchBase.Mui-focusVisible .MuiSwitch-thumb': {
    color: '#BA374D', // Thumb color when focusVisible
    border: '6px solid #fff',
  },
}));
  



const CustomizedSwitch = ({onChange,onClick,checked}) => {
  return (
    <CustomSwitch onChange={onChange} onClick={onClick} checked={checked} />
  )
}

export default CustomizedSwitch