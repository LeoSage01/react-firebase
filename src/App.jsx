import { useEffect, useState } from 'react'
import './App.css'
import { Auth } from "./components/auth"
import { db, auth, storage } from './config/firebase'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'


function App() {
  const [moviesList, setMoviesList] = useState([])

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

  // Update states
  const [updatedTitle, setupdatedTitle] = useState("")

  // File Upload state
  const [fileUpload, setFileUpload] = useState(null)

  const moviesCollectionRef = collection(db, "movies")

  const onSubmitMovie = async () => {

    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        recievedOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      })
    } catch (err) {
      console.log(err);
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc);
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title: updatedTitle});
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFoldersRef = ref(storage, `projectfiles/${fileUpload.name}`)
    try {
      await uploadBytes(filesFoldersRef, fileUpload)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getMoviesList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        setMoviesList(filteredData)
      } catch (err) {
        console.log(err);
      }
    }
    getMoviesList()
  }, [])



  return (
    <div className="App">
      <Auth />

      <div className="">
        <input
          placeholder='Movie title'
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder='release date'
          type='number'
          onChange={(e) => setNewReleaseDate(e.target.value)}
        />
        <input type='checkbox'
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>Recieved An Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div className="">
        {moviesList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.recievedOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input type="text" placeholder='New Title...' onChange={(e) => setupdatedTitle(e.target.value)} />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>

      <div className="">
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  )
}

export default App
