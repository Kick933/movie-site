// This component takes movie/show data as props and give a div with its Genres, release date and runtime.


export default function Genre({data}) {
  return (
    <div className="py-0.5 text-sm text-gray-600">
        <p className="py-1">Genre : {data.genres.map(i => i.name).join(', ')}</p>
        <p className="py-1">{data.status}{data.release_date ? `: ${data.release_date}` : null}</p>
        {data.runtime ? <p className="text-xs text-gray-600 py-1">Runtime: {data.runtime} Minutes</p> : null}
    </div>
  )
}
