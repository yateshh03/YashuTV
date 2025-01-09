import axios from 'axios'

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmIzOWU0ZDk5NzU5NjkwNmY0ZWQ2ZjYwZGZiNGJhYyIsIm5iZiI6MTczNDI5OTk1My45NTIsInN1YiI6IjY3NWY1MTMxNWJkM2M3MmE4MmMxYWY0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KITBpyEbZ9IRQH614j7hB1DPp77LWC0AlxH3qL16Crw'
      }
})

export default instance