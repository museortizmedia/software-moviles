export default function MissionCard({
title,
points,
completed,
onClick
}: any) {
return (

<div className="
bg-slate-900
p-4
rounded-2xl
border border-slate-800
flex
justify-between
items-center
">

<div>

<h3 className="font-semibold">
{title}
</h3>

<p className="text-sm text-slate-400">
{points} pts
</p>

</div>

{completed ? (
<div className="text-green-400">
Completed
</div>
) : (
<button
onClick={onClick}
className="
bg-indigo-600
px-4
py-2
rounded-xl
text-sm
"
>
Start
</button>
)}

</div>

);
}