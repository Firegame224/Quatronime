"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";


interface GenresToggleProps {
    onSelect: string[];
    setOnSelect: (value: string[]) => void;
}
export default function GenresToggle({onSelect, setOnSelect} : GenresToggleProps) {

  const Genre = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
  ];

  return (
    <>
      <ToggleGroup
        type="multiple"
        value={onSelect}
        className="grid-cols-5 grid"
        onValueChange={(value) => setOnSelect(value)}
      >
        {Genre.map((genre, index) => {
          return (
            <ToggleGroupItem
            title={genre}
              value={genre}
              key={index}

              className="shadow-md border-black text-[10px] sm:text-sm data-[state=on]:bg-red-600"
            >
            {genre}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
        <p>
            {onSelect.length > 0 ? onSelect.join(", ") : "Pilih Genre"}
        </p>
    </>
  );
}
