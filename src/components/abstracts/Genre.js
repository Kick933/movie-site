// This component takes movie/show data as props and give a div with its Genres, release date and runtime.


export default function Genre({data}) {
  return (
    <div className="py-0.5 text-sm text-gray-600">
        <p>Genre : {data.genres.map(i => i.name).join(', ')}</p>
        <p>{data.status}{data.release_date ? `: ${data.release_date}` : null}</p>
        {data.runtime ? <p>Runtime: {data.runtime} Minutes</p> : null}
    </div>
  )
}
