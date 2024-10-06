import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Switch from '@mui/material/Switch';
import router from "next/router";
import useActivitiesInsert from '@/hooks/firebase/useActivitiesInsert';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '36ch',
      '&:focus': {
        width: '60ch',
      },
    },
  },
}));

const YellowSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: "#f8b40c",
    '&:hover': {
      backgroundColor: alpha(theme.palette.warning.main, 0.15),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: "#f8b40c",
  },
}));

interface SearchAppBarProps {
  setQuery: (query: string) => void;
  useSemantic: boolean;
  setUseSemantic: (useSemantic: boolean) => void;
}

export default function SearchAppBar({ setQuery, useSemantic, setUseSemantic }: SearchAppBarProps) {
  const { insertAction } = useActivitiesInsert();
  
  const [localQuery, setLocalQuery] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('searchQuery') || '';
    }
    return '';
  });

  React.useEffect(() => {
    if (localQuery) {
      sessionStorage.setItem('searchQuery', localQuery);
    }
  }, [localQuery]);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setQuery(localQuery);

      try {
        await insertAction('search', localQuery);
      } catch (error) {
        console.error('Failed to log search activity:', error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(event.target.value);
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseSemantic(event.target.checked);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: '#0d468f' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, ml: 2 }}
            onClick={() => router.push("/")}
          >
            <img
              src="https://yt3.ggpht.com/a/AATXAJzGIpn234_LYi-ZxPBp9xMV8SOqMRAsE36L0Q=s900-c-k-c0xffffffff-no-rj-mo"
              alt="Welcome"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "40px",
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 'bold' }}
          >
            Búsqueda de Documentos
          </Typography>
          <Typography
            variant="body1"
            sx={{
              ml: 2,
              color: useSemantic ? "#f8b40c" : "inherit",
              fontWeight: 'bold',
              transition: "color 0.3s, font-weight 0.3s",
            }}
          >
            Búsqueda Semántica
          </Typography>
          <YellowSwitch checked={useSemantic} onChange={handleToggleChange} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              value={localQuery}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
