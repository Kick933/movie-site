// This component provide overview for movie/page


export default function Plot({data}) {
  return (
    <div className="py-4 text-gray-700">
        <p className="py-1 font-semibold">Overview</p>
        <p className="bg-transparent ">{data.overview || "Plot unknown"}</p>
    </div>
  )
}
