// This component provide overview for movie/page


export default function Plot({data}) {
  return (
    <div className="py-4 text-gray-700 text-xs md:text-base">
        <p className="py-1 font-semibold underline">Overview</p>
        <p className="bg-transparent">{data.overview || "Plot unknown"}</p>
    </div>
  )
}
