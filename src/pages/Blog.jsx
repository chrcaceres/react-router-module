import { useFetch } from "../hooks/useFetch";
import { Link, useSearchParams } from "react-router-dom";

const Blog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, loading, error } = useFetch(
        "https://jsonplaceholder.typicode.com/posts"
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    const handleChange = (e) => {
        let filter = e.target.value;

        if (filter) {
            setSearchParams({ filter: filter });
        } else {
            setSearchParams({});
        }
    };

    return (
        <>
            <h1>Blog</h1>
            <input
                type="text"
                name=""
                onChange={handleChange}
                className="form-control my-3"
            ></input>
            <ul className="list-group">
                {data
                    .filter((item) => {
                        let filter = searchParams.get("filter");
                        if (!filter) return true;
                        let name = item.title.toLowerCase();
                        return name.startsWith(filter.toLowerCase());
                    })
                    .map((item) => (
                        <Link
                            to={`/blog/${item.id}`}
                            key={item.id}
                            className="list-group-item"
                            value={searchParams.get("filter") || ""}
                        >
                            {item.id} - {item.title}
                        </Link>
                    ))}
            </ul>
        </>
    );
};

export default Blog;
