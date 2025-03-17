const { constants } = require("./source/constants");
const File = require("./source/file");
const { rejects, deepStrictEqual } = require("assert");
const { error } = constants;

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        id: 1,
        name: "Vyctor",
        profession: "Javascript Developer",
        birthDay: 1995,
      },
      {
        id: 2,
        name: "Xuxa",
        profession: "Javascript Specialist",
        birthDay: 1945,
      },
      {
        id: 3,
        name: "Miguel",
        profession: "Javascript Software Engineer",
        birthDay: 2019,
      },
    ];
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
