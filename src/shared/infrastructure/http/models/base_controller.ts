import { Request, Response } from "express";

export abstract class BaseController {
  protected abstract executeImpl(
    req: Request<any>,
    res: Response
  ): Promise<void | any>;

  public async execute(req: Request, res: Response): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err: any) {
      console.log(`[BaseController]: Uncaught controller error`);
      console.log(err);
      this.fail(res, "An unexpected error occured");
    }
  }

  public static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ error: message });
  }

  public ok<T>(res: Response, dto?: T) {
    if (!!dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    }

    return res.sendStatus(200);
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  // Error Response -->

  public clientError(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      400,
      message ? message : "Unauthorized"
    );
  }

  public unauthorized(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      401,
      message ? message : "Unauthorized"
    );
  }

  public paymentRequired(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      402,
      message ? message : "Payment Required"
    );
  }

  public forbidden(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      403,
      message ? message : "Forbidden"
    );
  }

  public notFound(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      404,
      message ? message : "Not found"
    );
  }

  public conflict(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      409,
      message ? message : "Conflict"
    );
  }

  public tooMany(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      429,
      message ? message : "Too many request"
    );
  }

  public fail(res: Response, error: Error | string) {
    return res.status(500).json({
      message: error,
    });
  }
}
