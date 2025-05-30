import { CorsOptions} from 'cors'


export const corsConfig : CorsOptions = {
  origin: function (origin, callback) {
    if(origin === 'http://localhost:5173') {
      console.log('Permitir Coneccinon')
      callback(null, true);
    }
    else {
      console.log('Bloquear Coneccinon')
      callback(new Error('No permitido por CORS'));
    }
  }
}