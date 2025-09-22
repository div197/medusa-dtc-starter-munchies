import { createStep, createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk";
import { MedusaModule, Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";

const seedUSRegion = createWorkflow("seed-us-region", () => {
  const step1 = createStep("add-us-to-region", async ({ }, { container }) => {
    const regionModuleService = container.resolve(Modules.REGION);

    // Get existing region
    const regions = await regionModuleService.listRegions();
    if (!regions || regions.length === 0) {
      console.log("No regions found");
      return;
    }

    const region = regions[0];
    console.log("Found region:", region.id);

    // Add US country to the region
    await regionModuleService.updateRegions(region.id, {
      countries: ["us", "dk", "fr", "de", "it", "es", "se", "gb"]
    });

    console.log("Added US to region");

    return { success: true };
  });

  return new WorkflowResponse(step1);
});

export default async function seed({ container }) {
  console.log("Adding US to region...");

  try {
    const { result } = await seedUSRegion(container).run({
      input: {},
    });

    console.log("US added successfully!");
  } catch (error) {
    console.error("Error adding US:", error);
  }
}