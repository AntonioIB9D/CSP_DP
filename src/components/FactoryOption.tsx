type FactoryOptionProps = {
  factoryOptionName: string;
  value: string | number | null | undefined;
  icon?: string;
};

export default function FactoryOption({
  factoryOptionName,
  value,
  icon,
}: FactoryOptionProps) {
  const items = String(value).split(", ");
  return (
    <div className="bg-[#000000] rounded-2xl p-6 flex flex-col justify-center items-center gap-4">
      <div>
        <h2 className="text-[#86868B]">
          {factoryOptionName === "Festoon SMC"
            ? `${factoryOptionName} (Experimental)`
            : factoryOptionName}
        </h2>
      </div>
      {icon && <i className={`${icon} text-4xl`}></i>}
      <div>
        <h3
          className={`text-[#D57F43] font-bold ${String(value).length >= 15 ? "text-xl text-center" : "text-2xl"}`}
        >
          {items.join(", ").length >= 15 ? (
            <>
              {items.slice(0, items.length - 2).join(", ")}
              <br />
              {items.slice(-2).join(", ")}
            </>
          ) : (
            items.join(", ")
          )}
        </h3>
      </div>
    </div>
  );
}
