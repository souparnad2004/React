

function StatBar({ value }) {
  return (
    <div className="w-full bg-gray-300 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full"
        style={{ width: `${(value / 5) * 100}%` }}
      />
    </div>
  );
}

function CatDetails({ cat }) {
    if(!cat) return null;
  const attributes = [
    { label: "Adaptability", value: cat.adaptability },
    { label: "Affection", value: cat.affection_level },
    { label: "Child Friendly", value: cat.child_friendly },
    { label: "Dog Friendly", value: cat.dog_friendly },
    { label: "Energy", value: cat.energy_level },
    { label: "Grooming", value: cat.grooming },
    { label: "Intelligence", value: cat.intelligence },
    { label: "Social Needs", value: cat.social_needs },
    { label: "Stranger Friendly", value: cat.stranger_friendly },
    { label: "Vocalisation", value: cat.vocalisation },
  ];
  return (
    <div className="text-white">
      <div
        className="h-80 bg-contain bg-no-repeat bg-center flex items-end p-6"
        style={{ backgroundImage: `url(${cat.image})` }}
      >
        <div className="bg-black/50 p-4 rounded-xl">
          <h1 className="text-3xl font-bold">{cat.name}</h1>
          <p>
            {cat.alt_names} • {cat.origin}
          </p>
        </div>
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-6">

        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-300">{cat.description}</p>

          <div className="mt-4 flex gap-6">
            <div>
              <h4 className="text-sm text-gray-400">WEIGHT</h4>
              <p>{cat.weight.metric} kg</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400">LIFESPAN</h4>
              <p>{cat.life_span} years</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Attributes</h2>

          {attributes.map((attr, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{attr.label}</span>
                <span>{attr.value}/5</span>
              </div>
              <StatBar value={attr.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CatDetails;
