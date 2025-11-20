
import { useState } from "react";
import { v4 as uuid } from "uuid";

// Enhanced scoreboard: editable names, avatars, add/remove people
export default function Scoreboard() {
  const [people, setPeople] = useState([
    { id: uuid(), name: "Person 1", score: 0, avatar: "https://via.placeholder.com/50" },
    { id: uuid(), name: "Person 2", score: 0, avatar: "https://via.placeholder.com/50" }
  ]);

  const addPerson = () => {
    setPeople([
      ...people,
      {
        id: uuid(),
        name: "New Person",
        score: 0,
        avatar: "https://via.placeholder.com/50"
      }
    ]);
  };

  const removePerson = (id) => {
    setPeople(people.filter((p) => p.id !== id));
  };

  const updatePerson = (id, field, value) => {
    setPeople(
      people.map((person) =>
        person.id === id ? { ...person, [field]: value } : person
      )
    );
  };

  const addScore = (id, value) => {
    setPeople(
      people.map((p) => (p.id === id ? { ...p, score: p.score + value } : p))
    );
  };

  const resetScores = () => {
    setPeople(people.map((p) => ({ ...p, score: 0 })));
  };

  const sorted = [...people].sort((a, b) => b.score - a.score);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Advanced Scoreboard</h1>

      <button
        className="px-4 py-2 rounded-xl bg-blue-100 hover:bg-blue-200"
        onClick={addPerson}
      >
        + Add Person
      </button>

      <div className="grid gap-4">
        {people.map((person) => (
          <div
            key={person.id}
            className="p-4 rounded-2xl shadow bg-white flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={person.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full shadow"
              />
              <div>
                <input
                  value={person.name}
                  onChange={(e) => updatePerson(person.id, "name", e.target.value)}
                  className="border rounded-xl px-2 py-1 w-32"
                />
                <input
                  value={person.avatar}
                  onChange={(e) => updatePerson(person.id, "avatar", e.target.value)}
                  className="border rounded-xl px-2 py-1 w-48 mt-1"
                  placeholder="Avatar URL"
                />
                <div className="text-gray-600 mt-1">Score: {person.score}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200"
                onClick={() => addScore(person.id, 1)}
              >
                +1
              </button>
              <button
                className="px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200"
                onClick={() => addScore(person.id, 5)}
              >
                +5
              </button>
              <button
                className="px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200"
                onClick={() => addScore(person.id, 10)}
              >
                +10
              </button>
              <button
                className="px-3 py-1 rounded-xl bg-red-100 hover:bg-red-200 text-red-700"
                onClick={() => removePerson(person.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl shadow bg-white">
        <h2 className="font-bold text-lg mb-2">Ranking</h2>
        {sorted.map((p, i) => (
          <div key={p.id} className="flex justify-between py-1">
            <span>
              {i + 1}. {p.name}
            </span>
            <span>{p.score}</span>
          </div>
        ))}
      </div>

      <button
        className="w-full py-2 rounded-2xl bg-red-100 hover:bg-red-200 text-red-700"
        onClick={resetScores}
      >
        Reset All Scores
      </button>
    </div>
  );
}
