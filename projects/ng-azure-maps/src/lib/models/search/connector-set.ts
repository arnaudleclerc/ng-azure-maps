export enum ConnectorSet {
  /**
   * These are the standard household connectors for a certain region. They are all AC single phase and the standard Voltage and standard Amperage
   */
  StandardHouseholdCountrySpecific = "StandardHouseholdCountrySpecific",
  /**
   * Type 1 connector as defined in the IEC 62196-2 standard. Also called Yazaki after the original manufacturer or SAE J1772 after the standard that first published it. Mostly used in combination with 120V single phase or up to 240V single phase infrastructure.
   */
  IEC62196Type1 = "IEC62196Type1",
  /**
   * Type 1 based combo connector as defined in the IEC 62196-3 standard. The connector is based on the Type 1 connector – as defined in the IEC 62196-2 standard – with two additional direct current (DC) contacts to allow DC fast charging.
   */
  IEC62196Type1CCS = "IEC62196Type1CCS",
  /**
   * Type 2 connector as defined in the IEC 62196-2 standard. Provided as a cable and plug attached to the charging point.
   */
  IEC62196Type2CableAttached = "IEC62196Type2CableAttached",
  /**
   * Type 2 connector as defined in the IEC 62196-2 standard. Provided as a socket set into the charging point.
   */
  IEC62196Type2Outlet = "IEC62196Type2Outlet",
  /**
   *  Type 2 based combo connector as defined in the IEC 62196-3 standard. The connector is based on the Type 2 connector – as defined in the IEC 62196-2 standard – with two additional direct current (DC) contacts to allow DC fast charging.
   */
  IEC62196Type2CCS = "IEC62196Type2CCS",
  /**
   * Type 3 connector as defined in the IEC 62196-2 standard. Also called Scame after the original manufacturer. Mostly used in combination with up to 240V single phase or up to 420V three phase infrastructure.
   */
  IEC62196Type3 = "IEC62196Type3",
  /**
   * CHAdeMO connector named after an association formed by the Tokyo Electric Power Company and industrial partners. Because of this is is also known as the TEPCO's connector. It supports fast DC charging.
   */
  Chademo = "Chademo",
  /**
   * Industrial Blue connector is a connector defined in the IEC 60309 standard. It is sometime referred to as by some combination of the standard, the color and the fact that is a single phase connector. The connector usually has the "P+N+E, 6h" configuration.
   */
  IEC60309AC1PhaseBlue = "IEC60309AC1PhaseBlue",
  /**
   * Industrial White connector is a DC connector defined in the IEC 60309 standard.
   */
  IEC60309DCWhite = "IEC60309DCWhite",
  /**
   * The Tesla connector is the regionally specific Tesla Supercharger connector. I.e. it refers to either Tesla's proprietary connector, sometimes referred to as Tesla Port mostly limited to North America or the modified Type 2 (DC over Type 2) in Europe.
   */
  Tesla = "Tesla"
}
