export default function RankingCard() {
return (

<div className="
bg-slate-900
p-4
rounded-2xl
border border-slate-800
mx-4
mt-4
">

<h3 className="mb-3 font-semibold">
Ranking
</h3>

<div className="space-y-2">

<div className="flex justify-between">
<span>Juan</span>
<span>120</span>
</div>

<div className="flex justify-between">
<span>Ana</span>
<span>95</span>
</div>

<div className="flex justify-between">
<span>Tú</span>
<span className="text-indigo-400">
80
</span>
</div>

</div>

</div>

);
}