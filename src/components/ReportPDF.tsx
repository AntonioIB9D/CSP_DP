import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  Font,
  Svg,
  G,
  Polygon,
} from "@react-pdf/renderer";
import type { TagsData } from "../schemas/tagsPro.schema";

Font.register({
  family: "Outfit",
  src: "/src/fonts/OutfitVariant/Outfit-Regular.ttf", // ruta relativa o URL
});

Font.register({
  family: "Outfit",
  src: "/src/fonts/OutfitVariant/Outfit-Bold.ttf",
  fontWeight: "bold",
});

// Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#000000",
  },
  textOrangeOne: {
    color: "#FF791B",
    fontSize: "25px",
    fontFamily: "Outfit",
  },
  textNormal: {
    color: "#D5D3D3",
    fontSize: "10px",
    fontFamily: "Outfit",
  },
  imageModel: {
    width: "370px",
    height: "200px",
    marginLeft: "110px",
    marginTop: "30px",
  },
  backgroundGray: {
    backgroundColor: "#121214",
    height: "300px",
  },
  textMedium: {
    color: "#D5D3D3",
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
});

type ReportPDFProps = {
  data: TagsData | null | undefined;
};

export default function ReportPDF({ data }: ReportPDFProps) {
  const firstBoxStep = data ? data[0] : null;

  const ak050 =
    firstBoxStep?.product[0] && firstBoxStep?.product[0].includes("AK050");
  const ak030 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK030");
  const ak010 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK010");
  const ak060 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK060");
  const ak040 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK040");
  const ak020 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK020");

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

  const manufacturingDate = firstBoxStep?.time_stamp.split(" ") || "-";

  const cavidad = firstBoxStep?.cavidad[0] || "-";

  const pressNumberCut = firstBoxStep?.tag.charAt(0) || "-";
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
    ? firstBoxStep?.serie.split("-")[0]
    : "-";
  const FestoonSerieTwo = firstBoxStep?.serie
    ? firstBoxStep?.serie.split("-")[1]
    : "-";

  const zone = firstBoxStep?.zona;

  return (
    <Document>
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
      </Page>
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
              color: "#D5D3D3",
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
            marginTop: "50px",
            padding: "16px",
          }}
        >
          <Text
            style={{
              color: "#FF6A0F",
              fontWeight: "bold",
              fontFamily: "Outfit",
              fontSize: "12px",
            }}
          >
            Drill Entrance:
          </Text>
        </View>
      </Page>
    </Document>
  );
}
