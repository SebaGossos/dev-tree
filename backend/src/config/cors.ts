import { CorsOptions} from 'cors'

export const corsConfig : CorsOptions = {
  origin: function (origin, callback) {
    const whiteList = [process.env.FRONTEND_URL]

    if(process.argv.includes('--api')) {
      whiteList.push(undefined)
    }
    
    if(whiteList.includes(origin)) {
      callback(null, true);
    }
    else {
      callback(new Error('No permitido por CORS'));
    }
  }
}