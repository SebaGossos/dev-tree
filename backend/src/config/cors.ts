import { CorsOptions} from 'cors'

const allowedOrigins = {
  FRONTEND_URL: process.env.FRONTEND_URL
}

export const corsConfig : CorsOptions = {
  origin: function (origin, callback) {
    if(origin === allowedOrigins.FRONTEND_URL) {
      console.log('Permitir Coneccinon')
      callback(null, true);
    }
    else {
      console.log('Bloquear Coneccinon')
      callback(new Error('No permitido por CORS'));
    }
  }
}