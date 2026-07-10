import type { Metadata } from "next";
import { getBlogPostBySlug } from "@/lib/api/blog";
import { getEquipmentById, getExerciseById } from "@/lib/api/exercise";
import { getProductDetails } from "@/lib/api/products";
import { resolveProductImage } from "@/lib/api/mappers";
import { buildMetadata, truncateDescription } from "./build";
import { DEFAULT_DESCRIPTION } from "./config";

export async function productMetadata(productId: string): Promise<Metadata> {
  const id = Number(productId);
  if (!Number.isFinite(id) || id <= 0) {
    return buildMetadata({
      title: "Product",
      description: DEFAULT_DESCRIPTION,
      path: `/product/${productId}`,
      noIndex: true,
    });
  }

  try {
    const product = await getProductDetails(id);
    if (!product) {
      return buildMetadata({
        title: "Product Not Found",
        description: DEFAULT_DESCRIPTION,
        path: `/product/${id}`,
        noIndex: true,
      });
    }

    const title = product.metaTitle?.trim() || product.productName;
    const description = truncateDescription(
      product.metaDescription?.trim() ||
        product.productShortDescription ||
        product.productDescription ||
        `Shop ${product.productName} at Deepfit.`,
    );

    return buildMetadata({
      title,
      description,
      path: `/product/${id}`,
      image: resolveProductImage(product),
    });
  } catch {
    return buildMetadata({
      title: "Product",
      description: DEFAULT_DESCRIPTION,
      path: `/product/${id}`,
    });
  }
}

export async function blogPostMetadata(slug: string): Promise<Metadata> {
  try {
    const post = await getBlogPostBySlug(slug);
    const title = post.metaTitle?.trim() || post.title;
    const description = truncateDescription(
      post.metaDescription?.trim() ||
        post.excerpt ||
        `Read ${post.title} on the Deepfit blog.`,
    );

    return buildMetadata({
      title,
      description,
      path: `/blog/${slug}`,
      image: post.featuredImage || undefined,
      type: "article",
    });
  } catch {
    return buildMetadata({
      title: "Blog Post",
      description: DEFAULT_DESCRIPTION,
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }
}

export async function equipmentMetadata(
  equipmentId: string,
): Promise<Metadata> {
  const id = Number(equipmentId);
  if (!Number.isFinite(id) || id <= 0) {
    return buildMetadata({
      title: "Equipment",
      description: DEFAULT_DESCRIPTION,
      path: `/exercise/equipment/${equipmentId}`,
      noIndex: true,
    });
  }

  try {
    const equipment = await getEquipmentById(id);
    if (!equipment) {
      return buildMetadata({
        title: "Equipment Not Found",
        description: DEFAULT_DESCRIPTION,
        path: `/exercise/equipment/${id}`,
        noIndex: true,
      });
    }

    return buildMetadata({
      title: equipment.name,
      description: truncateDescription(
        equipment.description ||
          equipment.headline ||
          `Learn how to use ${equipment.name} with Deepfit exercises.`,
      ),
      path: `/exercise/equipment/${id}`,
      image: equipment.equipmentImage,
    });
  } catch {
    return buildMetadata({
      title: "Equipment",
      description: DEFAULT_DESCRIPTION,
      path: `/exercise/equipment/${id}`,
    });
  }
}

export async function exerciseMetadata(exerciseId: string): Promise<Metadata> {
  const id = Number(exerciseId);
  if (!Number.isFinite(id) || id <= 0) {
    return buildMetadata({
      title: "Workout",
      description: DEFAULT_DESCRIPTION,
      path: `/exercise/active/${exerciseId}`,
      noIndex: true,
    });
  }

  try {
    const exercise = await getExerciseById(id);
    if (!exercise) {
      return buildMetadata({
        title: "Workout Not Found",
        description: DEFAULT_DESCRIPTION,
        path: `/exercise/active/${id}`,
        noIndex: true,
      });
    }

    return buildMetadata({
      title: exercise.exerciseName,
      description: truncateDescription(
        exercise.description ||
          `Start ${exercise.exerciseName} with Deepfit Move Hub.`,
      ),
      path: `/exercise/active/${id}`,
      image: exercise.exerciseImage,
      noIndex: true,
    });
  } catch {
    return buildMetadata({
      title: "Workout",
      description: DEFAULT_DESCRIPTION,
      path: `/exercise/active/${id}`,
      noIndex: true,
    });
  }
}
