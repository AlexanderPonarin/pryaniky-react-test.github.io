import { Box, Typography, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';
import { fetchAuth } from '../../store/redux/slices/auth';
import { useNavigate } from 'react-router-dom';
import { TokenStatus } from '../../types/token-status';

export default function AuthPage() {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const tokenStatus = useAppSelector((state) => state.auth.data.tokenStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(fetchAuth({ username: username, password: password }));
    window.localStorage.setItem('username', username);
  };

  useEffect(() => {
    if (tokenStatus === TokenStatus.ACTIVE) {
      navigate('/');
    }
  }, [tokenStatus, navigate]);

  return (
    <main
      style={{
        background: 'linear-gradient(45deg, #a8edea, #fed6e3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 0,
      }}
    >
      <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
          Вход
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="username"
            type="text"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', mt: 2 }}>
            Войти
          </Button>
        </form>
      </Box>
    </main>
  );
}
