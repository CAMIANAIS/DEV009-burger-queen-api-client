export interface LoginMatcher { //para definir el tipo de dato esperado de los datos recibidos del servidor
    accessToken: string;
    user: {
      email: string;
      role: string;
      id: string;
    };
  }
