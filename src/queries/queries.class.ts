type filter = "all" | "tech" | "clothes";

type category = {
  id: string;
  name: string;
};

type query = {
  query: string;
};

class Queries {
  public getCategories(): query {
    return {
      query: `
      query {
        categories {
          id
          name
        }
      }
    `,
    };
  }
}

export default Queries;
