import React from "react";
import TableProvider, {
  Column,
  TableContent,
  TableContainer,
} from "../../components/TableProvider";

const createData = (amount: number) => {
  const result = [];
  for (let i = 0; i < amount; i++) {
    result.push({
      title: `Videogame title ${i}`,
      developer: "BioWare",
      publisher: "Electronic Arts",
      releaseDate: "2024-04-18",
      platform: "PC",
    });
  }
  return result;
};

const columns: Column[] = [
  {
    attribute: "title",
    label: "Title",
  },
  {
    attribute: "developer",
    label: "Developer",
  },
  {
    attribute: "publisher",
    label: "Publisher",
  },
  {
    attribute: "releaseDate",
    label: "Release date",
  },
  {
    attribute: "platform",
    label: "Platform",
  },
];

const rows = [
  {
    title: "Star Wars Outlaws",
    developer: "Ubisoft",
    publisher: "Ubisoft",
    releaseDate: "2024-10-01",
    platform: "PC",
  },
  {
    title: "Baldur's Gate 3",
    developer: "Larian",
    publisher: "Larian",
    releaseDate: "2024-10-01",
    platform: "PC",
  },
  {
    title: "Cyberpunk 2077",
    developer: "CD Project Red",
    publisher: "CD Project",
    releaseDate: "2024-10-01",
    platform: "PC",
  },
  {
    title: "Book of Travels",
    developer: "Other",
    publisher: "Other",
    releaseDate: "2024-10-01",
    platform: "PC",
  },
  {
    title: "Diablo IV",
    developer: "Blizzard",
    publisher: "Ubisoft",
    releaseDate: "2024-10-01",
    platform: "PC",
  },
  ...createData(1),
];

const Videogames = () => {
  return (
    <TableProvider columns={columns} rows={rows}>
      <TableContainer>
        <TableContent aria-label="simple table" />
      </TableContainer>
    </TableProvider>
  );
};

export default Videogames;
