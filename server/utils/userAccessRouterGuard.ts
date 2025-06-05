import { H3Event, EventHandlerRequest} from 'h3'
export default function userRouterGuard(event: H3Event<EventHandlerRequest>) {
    const userIdFromRoute = getRouterParam(event, 'id');
    const userIdFromAccessToken = event.context.accessToken.sub

    if(userIdFromAccessToken !== userIdFromRoute) {
        throw createError({
            statusCode: 403,
            statusMessage: "You do not have permission to view this resource"
        })
    }
}