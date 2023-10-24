export interface loginResponse { //para definir el formato esperado de los datos recibidos del servidor
    accessToken: string;
    user: {
      email: string;
      role: string;
      id: string;
    };
  }