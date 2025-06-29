package utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.Map;

public class PatchUtility {

    private static final ObjectMapper objectMapper = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    public static <T> T applyPatchToEntity(T existingEntity, Map<String, Object> patchPayload, Class<T> entityClass) {
        try {
            if (patchPayload.containsKey("id")) {
                throw new IllegalArgumentException("Patching 'id' field is not allowed");
            }

            ObjectNode entityNode = objectMapper.convertValue(existingEntity, ObjectNode.class);
            patchPayload.forEach((field, value) -> {
                entityNode.set(field, objectMapper.valueToTree(value));
            });

            return objectMapper.treeToValue(entityNode, entityClass);

        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to apply patch: " + e.getMessage(), e);
        }
    }
}
