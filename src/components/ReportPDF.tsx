import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import type { TagsData } from "../schemas/tagsPro.schema";
import {
  ldSideA,
  ldSideB,
  ldSideC,
  ldSideD,
  sdSideA,
  sdSideB,
  sdSideC,
  sdSideD,
} from "../data/boxesZones";

Font.register({
  family: "Outfit",
  src: "/OutfitVariant/Outfit-Regular.ttf", // ruta relativa o URL
});

Font.register({
  family: "Outfit",
  src: "/OutfitVariant/Outfit-Bold.ttf",
  fontWeight: "bold",
});

// Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
  },
  textOrangeOne: {
    color: "#FF791B",
    fontSize: "25px",
    fontFamily: "Outfit",
  },
  textNormal: {
    color: "#0068FF",
    fontSize: "10px",
    fontFamily: "Outfit",
    fontWeight: "bold",
  },
  imageModel: {
    width: "370px",
    height: "200px",
    marginLeft: "110px",
    marginTop: "30px",
  },
  imageDefectModel: {
    width: "430px",
    height: "280px",
    marginLeft: "110px",
    marginTop: "30px",
  },
  backgroundGray: {
    backgroundColor: "#6E6E6E",
    height: "300px",
  },
  textMedium: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "18px",
    fontFamily: "Outfit",
  },
  optionColor: {
    backgroundColor: "#000000",
    padding: "12px",
    width: "100px",
    height: "100px",
    borderRadius: "15px",
  },
  smallText: {
    color: "#86868B",
    fontSize: "9px",
    fontFamily: "Outfit",
  },
  OrangeMediumText: {
    color: "#D57F43",
    fontSize: "16px",
    fontFamily: "Outfit",
  },
  grayLightContainer: {
    backgroundColor: "#121214",
    borderRadius: "15px",
    padding: "12px",
  },
});

type ReportPDFProps = {
  data: TagsData | null | undefined;
};

export default function ReportPDF({ data }: ReportPDFProps) {
  const firstBoxStep = data ? data[0] : null;

  const ak050 =
    firstBoxStep?.product[0] && firstBoxStep?.product[0]?.includes("AK050");
  const ak030 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0]?.includes("AK030");
  const ak010 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0]?.includes("AK010");
  const ak060 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0]?.includes("AK060");
  const ak040 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0]?.includes("AK040");
  const ak020 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0]?.includes("AK020");

  // Option to product model
  const productModel =
    firstBoxStep?.parte === 10 || ak050
      ? "AK050"
      : firstBoxStep?.parte === 11 || ak030
        ? "AK030"
        : firstBoxStep?.parte === 12 || ak010
          ? "AK010"
          : firstBoxStep?.parte === 20 || ak060
            ? "AK060"
            : firstBoxStep?.parte === 21 || ak040
              ? "AK040"
              : firstBoxStep?.parte === 22 || ak020
                ? "AK020"
                : "Not assigned";

  //Windows Zones
  const windowsZones =
    productModel === "AK010"
      ? "-"
      : productModel === "AK020"
        ? "-"
        : productModel === "AK030"
          ? "BL2, BL1"
          : productModel === "AK040"
            ? "BL2, BL1"
            : productModel === "AK050"
              ? "PO1, PO2, CP2, BL1, BL2"
              : productModel === "AK060"
                ? "PO1, PO2, CP2, BL1, BL2"
                : "-";

  const boxType =
    productModel === "AK010" ||
    productModel === "AK030" ||
    productModel === "AK050"
      ? "Short Deck"
      : productModel === "AK020" ||
          productModel === "AK040" ||
          productModel === "AK060"
        ? "Long Deck"
        : "-";

  const manufacturingDate = firstBoxStep?.time_stamp?.split(" ") || "-";

  const cavidad = firstBoxStep?.cavidad[0] || "-";

  const pressNumberCut = firstBoxStep?.tag?.charAt(0) || "-";
  const pressNumber =
    pressNumberCut === "1"
      ? "1"
      : pressNumberCut === "2"
        ? "2"
        : pressNumberCut === "3"
          ? "3"
          : "4";

  const shippingTape =
    productModel === "AK010"
      ? "8"
      : productModel === "AK020"
        ? "10"
        : productModel === "AK030"
          ? "8"
          : productModel === "AK040"
            ? "10"
            : productModel === "AK050"
              ? "8"
              : productModel === "AK060"
                ? "9"
                : "-";

  const FestoonSerieOne = firstBoxStep?.serie
    ? firstBoxStep?.serie?.split("-")[0]
    : "-";
  const FestoonSerieTwo = firstBoxStep?.serie
    ? firstBoxStep?.serie?.split("-")[1]
    : "-";

  const zone = firstBoxStep?.zona;

  const processOneData = data?.find((step) => step?.proceso === 1);
  const processTwoData = data?.find((step) => step?.proceso === 2);
  const processThreeData = data?.find((step) => step?.proceso === 3);
  const processFourData = data?.find((step) => step?.proceso === 4);
  const processFiveData = data?.find((step) => step?.proceso === 5);
  const processSixData = data?.find((step) => step?.proceso === 6);

  const arraysld = { ldSideA, ldSideB, ldSideC, ldSideD };
  const arrayssd = { sdSideA, sdSideB, sdSideC, sdSideD };
  let foundIn: [string, string[]] | undefined;

  if (
    productModel === "AK020" ||
    productModel === "AK040" ||
    productModel === "AK060"
  ) {
    foundIn = Object?.entries(arraysld)?.find(([, arr]) => {
      if (zone === undefined) return false;
      return Array.isArray(zone)
        ? zone.some((z) => arr?.includes(z))
        : arr?.includes(zone);
    });
  } else if (
    productModel === "AK010" ||
    productModel === "AK030" ||
    productModel === "AK050"
  ) {
    foundIn = Object.entries(arrayssd).find(([, arr]) => {
      if (zone === undefined) return false;
      return Array.isArray(zone)
        ? zone.some((z) => arr?.includes(z))
        : arr?.includes(zone);
    });
  } else {
    return null;
  }

  const boxImage =
    foundIn?.[0] === "ldSideA"
      ? "LD Side A"
      : foundIn?.[0] === "ldSideB"
        ? "LD Side B"
        : foundIn?.[0] === "ldSideC"
          ? "LD Side C"
          : foundIn?.[0] === "ldSideD"
            ? "LD Side D"
            : foundIn?.[0] === "sdSideA"
              ? "SD Side A"
              : foundIn?.[0] === "sdSideB"
                ? "SD Side B"
                : foundIn?.[0] === "sdSideC"
                  ? "SD Side C"
                  : foundIn?.[0] === "sdSideD"
                    ? "SD Side D"
                    : "";

  return (
    <Document>
      {/* Product Page */}
      <Page style={styles.page} size="A4">
        <View>
          <Text
            style={[
              styles.textOrangeOne,
              { textAlign: "center", marginTop: "50px", fontWeight: "bold" },
            ]}
          >
            Product
          </Text>
          <Text
            style={[
              styles.textNormal,
              { textAlign: "center", marginTop: "5px" },
            ]}
          >
            {productModel === "AK010"
              ? "This product not contains window cutouts"
              : productModel === "AK020"
                ? "This product not contains window cutouts"
                : productModel === "AK030"
                  ? "This product contains 2 window cutouts"
                  : productModel === "AK040"
                    ? "This product contains 2 window cutouts"
                    : "This product contains all window cutouts (5)"}
          </Text>
          <Image
            style={styles.imageModel}
            src={`/Product Models/${productModel}.png`}
          />
        </View>

        <View
          style={[
            styles.backgroundGray,
            {
              borderRadius: "15px",
              marginTop: "50px",
              marginLeft: "15px",
              marginRight: "15px",
              padding: "16px",
            },
          ]}
        >
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "6px",
              justifyContent: "flex-end",
              marginTop: "5px",
            }}
          >
            <View
              style={{
                borderRadius: "9999px",
                backgroundColor: "#27C93F",
                width: "8px",
                height: "8px",
              }}
            ></View>
            <View
              style={{
                borderRadius: "9999px",
                backgroundColor: "#FFBD2E",
                width: "8px",
                height: "8px",
              }}
            ></View>
            <View
              style={{
                borderRadius: "9999px",
                backgroundColor: "#FF5F56",
                width: "8px",
                height: "8px",
              }}
            ></View>
          </View>
          <Text style={[styles.textMedium, { marginTop: "10px" }]}>
            What factory features does this product have?
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <View
              style={[
                styles.optionColor,
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "16px",
                },
              ]}
            >
              <Text style={[styles.smallText, {}]}>Product Model</Text>
              <Text style={[styles.OrangeMediumText, { fontWeight: "bold" }]}>
                {productModel}
              </Text>
            </View>
            <View
              style={[
                styles.optionColor,
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "16px",
                },
              ]}
            >
              <Text style={[styles.smallText, {}]}>Product Model</Text>
              <Text
                style={[
                  styles.OrangeMediumText,
                  { fontWeight: "bold", fontSize: "12px", textAlign: "center" },
                ]}
              >
                {windowsZones}
              </Text>
            </View>
            <View
              style={[
                styles.optionColor,
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "16px",
                },
              ]}
            >
              <Text style={[styles.smallText, {}]}>Box Type</Text>
              <Text
                style={[
                  styles.OrangeMediumText,
                  { fontWeight: "bold", fontSize: "12px", textAlign: "center" },
                ]}
              >
                {boxType}
              </Text>
            </View>
            <View
              style={[
                styles.optionColor,
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "16px",
                },
              ]}
            >
              <Text style={[styles.smallText, {}]}>Manufacturing date</Text>
              <Text
                style={[
                  styles.OrangeMediumText,
                  { fontWeight: "bold", fontSize: "12px", textAlign: "center" },
                ]}
              >
                {manufacturingDate[0]}
              </Text>
            </View>
            <View
              style={[
                styles.optionColor,
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "16px",
                },
              ]}
            >
              <Text style={[styles.smallText, {}]}>Festoon SMC</Text>
              <Text
                style={[
                  styles.OrangeMediumText,
                  { fontWeight: "bold", fontSize: "12px", textAlign: "center" },
                ]}
              >
                {FestoonSerieOne}
                {FestoonSerieTwo}
              </Text>
            </View>
            <View
              style={[
                styles.optionColor,
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={[styles.smallText, {}]}>Mold/Cacity</Text>
              <Text
                style={[
                  styles.OrangeMediumText,
                  { fontWeight: "bold", fontSize: "12px", textAlign: "center" },
                ]}
              >
                {cavidad}
              </Text>
            </View>

            <View
              style={[
                styles.optionColor,
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={[styles.smallText, {}]}>Press</Text>
              <Text
                style={[
                  styles.OrangeMediumText,
                  { fontWeight: "bold", fontSize: "12px", textAlign: "center" },
                ]}
              >
                {pressNumber}
              </Text>
            </View>

            <View
              style={[
                styles.optionColor,
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={[styles.smallText, {}]}>Festoon Supplier</Text>
              <Text
                style={[
                  styles.OrangeMediumText,
                  { fontWeight: "bold", fontSize: "12px", textAlign: "center" },
                ]}
              >
                {firstBoxStep?.serie ? firstBoxStep?.supplierName : "-"}
              </Text>
            </View>

            <View
              style={[
                styles.optionColor,
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={[styles.smallText, {}]}>Shipping Tape</Text>
              <Text
                style={[
                  styles.OrangeMediumText,
                  { fontWeight: "bold", fontSize: "12px", textAlign: "center" },
                ]}
              >
                {shippingTape}
              </Text>
            </View>

            <View
              style={[
                styles.optionColor,
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={[styles.smallText, {}]}>Associated defects</Text>
              <Text
                style={[
                  styles.OrangeMediumText,
                  { fontWeight: "bold", fontSize: "12px", textAlign: "center" },
                ]}
              >
                {zone && zone.length > 0 ? "Yes" : "No"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.backgroundGray,
            {
              borderRadius: "15px",
              marginTop: "5px",
              marginLeft: "15px",
              marginRight: "15px",
              padding: "16px",
              height: "100px",
            },
          ]}
        >
          <Text style={[styles.textMedium, { textAlign: "center" }]}>
            Box ID
          </Text>
          <View
            style={{
              backgroundColor: "#000000",
              borderRadius: "10px",
              padding: "10px",
              marginTop: "5px",
            }}
          >
            <Text
              style={{
                color: "#D57F43",
                fontFamily: "Outfit",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {firstBoxStep?.boxId}
            </Text>
          </View>
        </View>
      </Page>
      {/* Product Registration Page */}
      <Page style={styles.page} size="A4">
        <View>
          <Text
            style={[
              styles.textOrangeOne,
              {
                textAlign: "center",
                marginTop: "50px",
                fontWeight: "bold",
                fontSize: "15px",
                fontFamily: "Outfit",
              },
            ]}
          >
            Process Registrarion
          </Text>
          <Text
            style={{
              color: "#0068FF",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "25px",
              fontFamily: "Outfit",
            }}
          >
            Recording of product hours in the process
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "16px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Process 1 */}
          <View
            style={[
              styles.grayLightContainer,
              {
                marginTop: "30px",
                padding: "16px",
                display: "flex",
                width: "200px",
                height: "200px",
                backgroundColor: "#FFFFFF",
              },
            ]}
          >
            <View
              style={{
                backgroundColor: "#E0E0E0",
                borderRadius: "5px",
                padding: "4px",
              }}
            >
              <Text
                style={{
                  color: "#0566ED",
                  fontSize: "9px",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  textAlign: "center",
                }}
              >
                Process 1
              </Text>
            </View>
            <Image
              style={{
                width: "120px",
                height: "95px",
                marginLeft: "30px",
                marginTop: "10px",
                borderRadius: "5px",
              }}
              src="Drill 2.jpeg"
            />

            <Text
              style={[
                {
                  color: "#FF6A0F",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "5px",
                },
              ]}
            >
              Drill Entrance
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "10px",
              }}
            >
              <Text
                style={{
                  color: "#3A404A",
                  fontSize: "10px",
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                }}
              >
                Date:{" "}
                <Text style={{ fontWeight: "100" }}>
                  {processOneData?.time_stamp.split(" ")[0]}
                </Text>
              </Text>
              <Text
                style={{
                  color: "#3A404A",
                  fontSize: "10px",
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                }}
              >
                Time:{" "}
                <Text style={{ fontWeight: "100" }}>
                  {processOneData?.time_stamp.split(" ")[1]}{" "}
                </Text>
              </Text>
            </View>

            {/*  <Text style={{ color: "#FFFFFF" }}>Date: {}</Text> */}
          </View>
          {/* Process 2 */}
          <View
            style={[
              styles.grayLightContainer,
              {
                marginTop: "30px",
                padding: "16px",
                display: "flex",
                width: "200px",
                height: "200px",
                backgroundColor: "#FFFFFF",
              },
            ]}
          >
            <View
              style={{
                backgroundColor: "#E0E0E0",
                borderRadius: "5px",
                padding: "4px",
              }}
            >
              <Text
                style={{
                  color: "#13CB6C",
                  fontSize: "9px",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  textAlign: "center",
                }}
              >
                Process 2
              </Text>
            </View>
            <Image
              style={{
                width: "120px",
                height: "95px",
                marginLeft: "30px",
                marginTop: "10px",
                borderRadius: "5px",
              }}
              src="DrillExit.jpeg"
            />

            <Text
              style={[
                {
                  color: "#FF6A0F",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "5px",
                },
              ]}
            >
              Drill Exit
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "10px",
              }}
            >
              <Text
                style={{
                  color: "#3A404A",
                  fontSize: "10px",
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                }}
              >
                Date:{" "}
                <Text style={{ fontWeight: "100" }}>
                  {processTwoData?.time_stamp.split(" ")[0]
                    ? processTwoData?.time_stamp.split(" ")[0]
                    : "-"}
                </Text>
              </Text>
              <Text
                style={{
                  color: "#3A404A",
                  fontSize: "10px",
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                }}
              >
                Time:{" "}
                <Text style={{ fontWeight: "100" }}>
                  {processTwoData?.time_stamp.split(" ")[1]
                    ? processTwoData?.time_stamp.split(" ")[1]
                    : "-"}{" "}
                </Text>
              </Text>
            </View>
          </View>
          {/* Process 3 */}
          <View
            style={[
              styles.grayLightContainer,
              {
                padding: "16px",
                display: "flex",
                width: "200px",
                height: "200px",
                backgroundColor: "#FFFFFF",
              },
            ]}
          >
            <View
              style={{
                backgroundColor: "#E0E0E0",
                borderRadius: "5px",
                padding: "4px",
              }}
            >
              <Text
                style={{
                  color: "#FF6831",
                  fontSize: "9px",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  textAlign: "center",
                }}
              >
                Process 3
              </Text>
            </View>
            <Image
              style={{
                width: "120px",
                height: "95px",
                marginLeft: "30px",
                marginTop: "10px",
                borderRadius: "5px",
              }}
              src="EntradaPaint.jpeg"
            />

            <Text
              style={[
                {
                  color: "#FF6A0F",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "5px",
                },
              ]}
            >
              Paint Entrance
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "10px",
              }}
            >
              <Text
                style={{
                  color: "#3A404A",
                  fontSize: "10px",
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                }}
              >
                Date:{" "}
                <Text style={{ fontWeight: "100" }}>
                  {processThreeData?.time_stamp.split(" ")[0]
                    ? processThreeData?.time_stamp.split(" ")[0]
                    : "-"}
                </Text>
              </Text>
              <Text
                style={{
                  color: "#3A404A",
                  fontSize: "10px",
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                }}
              >
                Time:{" "}
                <Text style={{ fontWeight: "100" }}>
                  {processThreeData?.time_stamp.split(" ")[1]
                    ? processThreeData?.time_stamp.split(" ")[1]
                    : "-"}{" "}
                </Text>
              </Text>
            </View>
          </View>
          {/* Process 4 */}
          <View
            style={[
              styles.grayLightContainer,
              {
                padding: "16px",
                display: "flex",
                width: "200px",
                height: "200px",
                backgroundColor: "#FFFFFF",
              },
            ]}
          >
            <View
              style={{
                backgroundColor: "#E0E0E0",
                borderRadius: "5px",
                padding: "4px",
              }}
            >
              <Text
                style={{
                  color: "#BE0B60",
                  fontSize: "9px",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  textAlign: "center",
                }}
              >
                Process 4
              </Text>
            </View>
            <Image
              style={{
                width: "120px",
                height: "95px",
                marginLeft: "30px",
                marginTop: "10px",
                borderRadius: "5px",
              }}
              src="Paint Exit 2.jpeg"
            />

            <Text
              style={[
                {
                  color: "#FF6A0F",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "5px",
                },
              ]}
            >
              Paint Exit
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "10px",
              }}
            >
              <Text
                style={{
                  color: "#3A404A",
                  fontSize: "10px",
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                }}
              >
                Date:{" "}
                <Text style={{ fontWeight: "100" }}>
                  {processFourData?.time_stamp.split(" ")[0]
                    ? processFourData?.time_stamp.split(" ")[0]
                    : "-"}
                </Text>
              </Text>
              <Text
                style={{
                  color: "#3A404A",
                  fontSize: "10px",
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                }}
              >
                Time:{" "}
                <Text style={{ fontWeight: "100" }}>
                  {processFourData?.time_stamp.split(" ")[1]
                    ? processFourData?.time_stamp.split(" ")[1]
                    : "-"}{" "}
                </Text>
              </Text>
            </View>
          </View>
          {/* Process 5 */}
          <View
            style={[
              styles.grayLightContainer,
              {
                padding: "16px",
                display: "flex",
                width: "200px",
                height: "200px",
                backgroundColor: "#FFFFFF",
              },
            ]}
          >
            <View
              style={{
                backgroundColor: "#E0E0E0",
                borderRadius: "5px",
                padding: "4px",
              }}
            >
              <Text
                style={{
                  color: "#43A6F6",
                  fontSize: "9px",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  textAlign: "center",
                }}
              >
                Process 5
              </Text>
            </View>
            <Image
              style={{
                width: "120px",
                height: "95px",
                marginLeft: "30px",
                marginTop: "10px",
                borderRadius: "5px",
              }}
              src="Assembly.jpeg"
            />

            <Text
              style={[
                {
                  color: "#FF6A0F",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "5px",
                },
              ]}
            >
              Assembly
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "10px",
              }}
            >
              <Text
                style={{
                  color: "#3A404A",
                  fontSize: "10px",
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                }}
              >
                Date:{" "}
                <Text style={{ fontWeight: "100" }}>
                  {processFiveData?.time_stamp.split(" ")[0]
                    ? processFiveData?.time_stamp.split(" ")[0]
                    : "-"}
                </Text>
              </Text>
              <Text
                style={{
                  color: "#3A404A",
                  fontSize: "10px",
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                }}
              >
                Time:{" "}
                <Text style={{ fontWeight: "100" }}>
                  {processFiveData?.time_stamp.split(" ")[1]
                    ? processFiveData?.time_stamp.split(" ")[1]
                    : "-"}{" "}
                </Text>
              </Text>
            </View>
          </View>
          {/* Process 6 */}
          <View
            style={[
              styles.grayLightContainer,
              {
                padding: "16px",
                display: "flex",
                width: "200px",
                height: "200px",
                backgroundColor: "#FFFFFF",
              },
            ]}
          >
            <View
              style={{
                backgroundColor: "#E0E0E0",
                borderRadius: "5px",
                padding: "4px",
              }}
            >
              <Text
                style={{
                  color: "#688896",
                  fontSize: "9px",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  textAlign: "center",
                }}
              >
                Process 6
              </Text>
            </View>
            <Image
              style={{
                width: "120px",
                height: "95px",
                marginLeft: "30px",
                marginTop: "10px",
                borderRadius: "5px",
              }}
              src="ShippingTape.jpeg"
            />

            <Text
              style={[
                {
                  color: "#FF6A0F",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "5px",
                },
              ]}
            >
              Shipping Tape
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "10px",
              }}
            >
              <Text
                style={{
                  color: "#3A404A",
                  fontSize: "10px",
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                }}
              >
                Date:{" "}
                <Text style={{ fontWeight: "100" }}>
                  {processSixData?.time_stamp.split(" ")[0]
                    ? processSixData?.time_stamp.split(" ")[0]
                    : "-"}
                </Text>
              </Text>
              <Text
                style={{
                  color: "#3A404A",
                  fontSize: "10px",
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                }}
              >
                Time:{" "}
                <Text style={{ fontWeight: "100" }}>
                  {processSixData?.time_stamp.split(" ")[1]
                    ? processSixData?.time_stamp.split(" ")[1]
                    : "-"}{" "}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </Page>
      {/* Defects Page */}
      <Page style={styles.page} size="A4">
        <View>
          <Text
            style={[
              styles.textOrangeOne,
              {
                textAlign: "center",
                marginTop: "50px",
                fontWeight: "bold",
                fontSize: "15px",
                fontFamily: "Outfit",
              },
            ]}
          >
            Defects Report
          </Text>
          <Text
            style={{
              color: "#0068FF",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "25px",
              fontFamily: "Outfit",
            }}
          >
            Product Defects at your disposal
          </Text>
        </View>
        {zone && zone.length > 0 ? (
          <View>
            <View>
              <Image
                style={styles.imageDefectModel}
                src={`/Product Models/${boxImage}.png`}
              />
            </View>
            <View
              style={[
                styles.backgroundGray,
                {
                  borderRadius: "15px",
                  marginTop: "50px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  padding: "16px",
                },
              ]}
            >
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: "6px",
                  justifyContent: "flex-end",
                  marginTop: "5px",
                }}
              >
                <View
                  style={{
                    borderRadius: "9999px",
                    backgroundColor: "#27C93F",
                    width: "8px",
                    height: "8px",
                  }}
                ></View>
                <View
                  style={{
                    borderRadius: "9999px",
                    backgroundColor: "#FFBD2E",
                    width: "8px",
                    height: "8px",
                  }}
                ></View>
                <View
                  style={{
                    borderRadius: "9999px",
                    backgroundColor: "#FF5F56",
                    width: "8px",
                    height: "8px",
                  }}
                ></View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <View
                  style={[
                    styles.optionColor,
                    {
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "16px",
                    },
                  ]}
                >
                  <Text style={[styles.smallText, {}]}>Defect</Text>
                  <Text
                    style={[
                      styles.OrangeMediumText,
                      { fontWeight: "bold", fontSize: "10px" },
                    ]}
                  >
                    {firstBoxStep?.defecto}
                  </Text>
                </View>
                <View
                  style={[
                    styles.optionColor,
                    {
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "16px",
                    },
                  ]}
                >
                  <Text style={[styles.smallText, {}]}>Zone</Text>
                  <Text
                    style={[
                      styles.OrangeMediumText,
                      {
                        fontWeight: "bold",
                        fontSize: "10px",
                        textAlign: "center",
                      },
                    ]}
                  >
                    {zone}
                  </Text>
                </View>
                <View
                  style={[
                    styles.optionColor,
                    {
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "16px",
                    },
                  ]}
                >
                  <Text style={[styles.smallText, {}]}>Process</Text>
                  <Text
                    style={[
                      styles.OrangeMediumText,
                      {
                        fontWeight: "bold",
                        fontSize: "10px",
                        textAlign: "center",
                      },
                    ]}
                  >
                    {firstBoxStep?.procesoDetectado}
                  </Text>
                </View>
                <View
                  style={[
                    styles.optionColor,
                    {
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "16px",
                    },
                  ]}
                >
                  <Text style={[styles.smallText, {}]}>Rework start time</Text>
                  <Text
                    style={[
                      styles.OrangeMediumText,
                      {
                        fontWeight: "bold",
                        fontSize: "10px",
                        textAlign: "center",
                      },
                    ]}
                  >
                    {firstBoxStep?.rwFechaRecibe[0] !== null
                      ? firstBoxStep?.rwFechaRecibe[0]
                      : "NO DATA"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.optionColor,
                    {
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "16px",
                    },
                  ]}
                >
                  <Text style={[styles.smallText, {}]}>Rework End Time</Text>
                  <Text
                    style={[
                      styles.OrangeMediumText,
                      {
                        fontWeight: "bold",
                        fontSize: "10px",
                        textAlign: "center",
                      },
                    ]}
                  >
                    {firstBoxStep?.rwFechaLibera[0] !== null
                      ? firstBoxStep?.rwFechaLibera[0]
                      : "NO DATA"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.optionColor,
                    {
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Text style={[styles.smallText, { textAlign: "center" }]}>
                    Quality Realease Date
                  </Text>
                  <Text
                    style={[
                      styles.OrangeMediumText,
                      {
                        fontWeight: "bold",
                        fontSize: "10px",
                        textAlign: "center",
                      },
                    ]}
                  >
                    {firstBoxStep?.qcFechaLibera[0] !== null
                      ? firstBoxStep?.qcFechaLibera[0]
                      : "NO DATA"}
                  </Text>
                </View>

                <View
                  style={[
                    styles.optionColor,
                    {
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Text style={[styles.smallText, {}]}>Quality Inspector</Text>
                  <Text
                    style={[
                      styles.OrangeMediumText,
                      {
                        fontWeight: "bold",
                        fontSize: "10px",
                        textAlign: "center",
                      },
                    ]}
                  >
                    {firstBoxStep?.qcLibera[0] !== null
                      ? firstBoxStep?.qcLibera[0]
                      : "NO DATA"}
                  </Text>
                </View>

                <View
                  style={[
                    styles.optionColor,
                    {
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Text style={[styles.smallText, {}]}>Status</Text>
                  <Text
                    style={[
                      styles.OrangeMediumText,
                      {
                        fontWeight: "bold",
                        fontSize: "10px",
                        textAlign: "center",
                      },
                    ]}
                  >
                    {firstBoxStep?.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              marginTop: "20px",
              marginLeft: "100px",
            }}
          >
            <Image
              style={{
                width: "350px",
                height: "300px",
                marginLeft: "30px",
                marginTop: "10px",
                borderRadius: "5px",
              }}
              src="FinishGood.jpeg"
            />
            <Text
              style={{
                color: "#86868B",
                fontFamily: "Outfit",
                fontSize: "12px",
                marginTop: "12px",
                marginLeft: "65px",
              }}
            >
              This product does not contain associated defects
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
