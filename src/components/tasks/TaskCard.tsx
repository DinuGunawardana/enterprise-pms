interface Props {

  title: string;

  priority: string;
}

export default function TaskCard({
  title,
  priority,
}: Props) {

  return (

    <div
      className="
        mb-3
        rounded-lg
        border
        bg-white
        p-4
        shadow-sm
      "
    >

      <h3 className="font-semibold">
        {title}
      </h3>

      <div className="mt-2">

        <span
          className="
            rounded
            bg-red-100
            px-2
            py-1
            text-xs
          "
        >
          {priority}
        </span>

      </div>

    </div>
  );
}